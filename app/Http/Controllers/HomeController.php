<?php

namespace App\Http\Controllers;

class HomeController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        // $this->middleware( 'auth' );
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function home() {
        return "Home";
    }

    
    public function register(){
        return view( 'layouts.Register' );
    }

}
