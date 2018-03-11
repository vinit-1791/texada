<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 
*/
class Model_product extends MY_Model
{
	protected $_table = 'products';
	protected $primary_key = 'product_ID';
	protected $return_type = 'array';
    
    public function getTrackingInfo($id) {
        $this->db->select('products.product_description,product_tracking.*');
        $this->db->from('products');
        $this->db->join('product_tracking', 'products.product_ID = product_tracking.product_id', 'right'); 
        $this->db->where('products.product_ID', $id); 
        $this->db->where('products.is_active', 1); 
        $query = $this->db->get();
        return $query->result();
    }
}