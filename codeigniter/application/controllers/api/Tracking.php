<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Tracking extends \Restserver\Libraries\REST_Controller {

    function __construct() {
        parent::__construct();
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    public function getProductTracking_get() {
        $id = $this->get('id');
        if ($id != NULL) {
            $id = (int) $id;
            if ($id <= 0) {
                $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
            }
            
            $this->load->model('Model_product');
            $trackingInfo = $this->Model_product->getTrackingInfo($id);
            // print_r($trackingInfo);
            if(isset($trackingInfo[0])) {
                $product['product_ID'] = $trackingInfo[0]->product_id;
                $product['product_description'] = $trackingInfo[0]->product_description;
                $product['tracking'] = $trackingInfo;
                $this->response($product, \Restserver\Libraries\REST_Controller::HTTP_OK); // OK (200) being the HTTP response code   
            } else {
                $this->load->model('Model_product');
                $product = $this->Model_product->get_by(array('product_ID' => $id));
                $this->response($product, \Restserver\Libraries\REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                
            }
        } else {
            $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
        }
    }
    
    public function addTracking_post() {
        $product_id = $this->post('product_id');
        
        if ($product_id != NULL) {
            $product_id = (int) $product_id;
            if ($product_id <= 0) {
                $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
            }
            
            $this->load->model('Model_product');
            $this->load->model('Model_tracking');
            $product = $this->Model_product->get_by(array('product_ID' => $product_id));
            if($product != null) {
            
                $time = strtotime($this->post('time'));
                $newformat = date('Y-m-d H:i:s',$time);
                
                $trackingInfo = array(
                    'product_id'=> $product_id,
                    'longitude' => $this->post('longitude'),
                    'latitude'  => $this->post('latitude'),
                    'elevation' => $this->post('elevation'),
                    'time' => $newformat
                );
                $inserted_tracking_id = $this->Model_tracking->insert($trackingInfo);
                
                if($inserted_tracking_id) {
                    $message = [
                        'success' => true,
                        'id' => $inserted_tracking_id,
                        'message' => 'Tracking details added successfully'
                    ];
                    $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
                } else {
                    $message = [
                        'success' => false,
                        'message' => 'Unable to add tracking information'
                    ];
                    $this->set_response($message, \Restserver\Libraries\REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
                }
            } else {
                $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
            }
        } else {
            $this->response(NULL, \Restserver\Libraries\REST_Controller::HTTP_BAD_REQUEST);
        }
    }
}