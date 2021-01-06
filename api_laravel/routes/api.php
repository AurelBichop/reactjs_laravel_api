<?php

use App\Http\Controllers\AuthenticationController;

use App\Http\Controllers\PictureController;
use App\Http\Middleware\React;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/


Route::post('/pictures', [PictureController::class,'search']);
Route::get('/pictures/{id}', [PictureController::class,'show'])->middleware(React::class);
Route::post('/pictures/store', [PictureController::class, 'store'] )->middleware(React::class);
Route::get('/pictures/{id}/checkLike', [PictureController::class, 'checkLike'] )->middleware(React::class);
Route::get('/pictures/{id}/handleLike', [PictureController::class, 'handleLike'] )->middleware(React::class);

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);



