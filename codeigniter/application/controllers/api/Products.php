<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Products extends \Restserver\Libraries\REST_Controller {

    function __construct() {
        parent::__construct();
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    public function index_get() {
        $this->load->model('Model_product');
        $products = $this->Model_product->get_many_by(array('is_active' => 1));
        
        if ($products) {
            $this->response($products, \Restserver\Libraries\REST_Controller::HTTP_OK);
        } else {
            $this->response([
                'status' => FALSE,
                'message' => 'No users were found'
            ], \Restserver\Libraries\REST_Controller::HTTP_NOT_FOUND);
        }
    }

    public function product_get() {
        $this->load->model('Model_product');
        $id = $this->get('id');
        if ($id != NULL) {
            $id = (int) $id;
            if ($id <= 0) {
                $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
            }
            
            $this->load->model('Model_product');
            $product = $this->Model_product->get_by(array('product_ID' => $id));
            $this->response($product, \Restserver\Libraries\REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        } else {
            $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
        }
    }

    public function addProduct_post() {
        $this->load->model('Model_product');
		$product = array(
			'product_description'   => $this->post('product_description'),
			'is_active'             => 1
		);
		$inserted_product_id = $this->Model_product->insert($product);
        
        if($inserted_product_id) {
            $message = [
                'success' => true,
                'id' => $inserted_product_id,
                'message' => 'Product added successfully'
            ];
            $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        } else {
            $message = [
                'success' => false,
                'message' => 'Unable to add new product'
            ];
            $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
        }
    }

    public function updateProduct_post() {
        $id = $this->post('id');
        if($id) {
            $id = (int) $id;
            $this->load->model('Model_product');
            $product = array(
                'product_description'   => $this->post('product_description'),
                'is_active'             => $this->post('is_active')
            );
            
            $isUpdated = $this->Model_product->update($id, $product);            
            if($isUpdated) {
                $message = [
                    'success' => true,
                    'message' => 'Product updated successfully'
                ];
                $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            } else {
                $message = [
                    'success' => false,
                    'message' => 'Unable to update product'
                ];
                $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
            }
        } else {
            //invalid request
        }
    }

    public function product_post() {
        $id = (int) $this->post('id');
        if ($id <= 0) {
            $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }
        $this->load->model('Model_product');
		$product = array(
			'is_active' => 0
		);
        
        $this->Model_product->update($id, $product);
        $message = [
            'id' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }
}
