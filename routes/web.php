<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/** admin login */
Route::get( '/', [App\Http\Controllers\HomeController::class, 'home'] )->name( 'public.home' );
Route::get( '/nsl-login', [App\Http\Controllers\Auth\AdminLoginController::class, 'login'] )->name( 'admin.loginme' );
Route::post( '/login-admin', [App\Http\Controllers\Auth\AdminLoginController::class, 'login'] );
Route::get( '/login-check', [App\Http\Controllers\Auth\AdminLoginController::class, 'loginCheck'] )->name( 'admin.loginCheck' );

// register route 
// Route::get( '/reg', [App\Http\Controllers\Auth\AdminLoginController::class, 'register']);
Route::get('/reg',[RegisterController::class, 'register']);
Route::post('/register-store',[RegisterController::class, 'store']);
Route::get('/reset-pass',function(){
    return view('layouts.admin_app');
});

// auth verify false
Auth::routes( ['verify' => false] );

// for storage linked in public folder
Route::get( '/sym', function () {
    File::link( storage_path( 'app/public' ), public_path( 'storage' ) );
    return response()->json( "Link Create Successfully!" );
} );

// cache clear
Route::get( '/clear', function () {
    Artisan::call( 'optimize:clear' );
    return response()->json( "Cache Cleared Successfully!" );
} );
