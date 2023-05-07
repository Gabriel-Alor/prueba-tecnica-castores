<?php

use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\RespuestaController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/personal', [PersonalController::class, 'store']);
Route::get('/personal', [PersonalController::class, 'index']);
Route::get('/personal/{id}', [PersonalController::class, 'buscarPersonal']);
Route::post('/login', [PersonalController::class, 'login']);
Route::put('/editarpersonal/{id}', [PersonalController::class, 'editarDatosPersonal']);

Route::post('/nota', [NotaController::class, 'store']);
Route::get('/notas', [NotaController::class, 'verNotas']);
Route::get('/nota/{id}', [NotaController::class, 'buscarNota']);

Route::post('/comentarios', [ComentarioController::class, 'store']);

Route::post('/respuestas', [RespuestaController::class, 'store']);
Route::get('/notas/{idnota}/comentarios', [RespuestaController::class,'comentariosConRespuestas']);
