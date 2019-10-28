/* global document */
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { schemaMerge } from 'lib/schemaFieldValues';
import { loadComponent } from 'lib/Injector';
import { setInterval, clearInterval } from 'timers';
import root from 'window-or-global';

const ElevationApp = loadComponent('ElevationApp');

jQuery.entwine('firesphere', ($) => {
  $('.elevation-component').entwine({ // parent div class in order to 3rd-party components as siblings
    Timer: {},

    onmatch() {
      this._super();
      const props = this.getAttributes();
      const timer = this.getTimer();

      // Wait until window.ss.store is available before rendering component
      clearInterval(timer[props.name]);
      const interval = setInterval(() => {
        if (root.ss.store && root.ss.apolloClient) {
          clearInterval(timer[props.name]);
          this.render();
        }
      });

      timer[props.name] = interval;
    },

    onunmatch() {
      this._super();

      // solves errors given by ReactDOM "no matched root found" error.
      ReactDOM.unmountComponentAtNode(this[0]);
    },

    render() {
      const props = this.getAttributes();
      ReactDOM.render(
        <ElevationApp {...props} noHolder />,
        this[0]
      );
    },

    /**
     * Find the selected node and get attributes associated to attach the data to the form
     *
     * @returns {Object}
     */
    getAttributes() {
      const state = $('input.elevation-field', this).data('state') || null;
      const schema = $('input.elevation-field', this).data('schema') || null;
      return schemaMerge(schema, state);
    },
  });
});
