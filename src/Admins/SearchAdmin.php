<?php

namespace Firesphere\SearchConfig\Admins;

use Firesphere\SearchConfig\Models\SearchClass;
use SilverStripe\Admin\ModelAdmin;

/**
 * Class \Firesphere\SearchConfig\Admins\SearchAdmin
 *
 */
class SearchAdmin extends ModelAdmin
{
    private static $managed_models = [
        SearchClass::class
    ];

    private static $url_segment = 'searchadmin';

    private static $menu_title = 'Search';
}
