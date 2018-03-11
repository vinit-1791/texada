<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Model_tracking extends MY_Model
{
	protected $_table = 'product_tracking';
	protected $primary_key = 'tracking_ID';
	protected $return_type = 'array';
}