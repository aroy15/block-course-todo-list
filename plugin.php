<?php
/**
 * Plugin Name:       Todo List
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Anjon Roy
 * Author URI:		  https://anjonroy.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       todo-list
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function blocks_course_todo_list_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'blocks_course_todo_list_block_init' );
