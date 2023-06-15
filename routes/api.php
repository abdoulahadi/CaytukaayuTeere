<?php

use App\Http\Controllers\Api\Admin\DepartementAdminController;
use App\Http\Controllers\Api\Admin\FormationAdminController;
use App\Http\Controllers\Api\Admin\UfrAdminController;
use App\Http\Controllers\Api\Admin\UniversityAdminController;
use App\Http\Controllers\Api\Admin\UserAdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DepartementController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\LicenceController;
use App\Http\Controllers\Api\UfrController;
use App\Http\Controllers\Api\UniversiteController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::apiResource('/users',UserAdminController::class);
    Route::apiResource('/universities',UniversityAdminController::class);
    Route::apiResource('/ufrs',UfrAdminController::class);
    Route::apiResource('/departements',DepartementAdminController::class);
    Route::apiResource('/formations',FormationAdminController::class);
});


Route::match(['put', 'post'], '/users_edit/{id}', [UserController::class, 'update']);

Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);

Route::post('/document',[DocumentController::class,'addDocument']);
Route::get('/document',[DocumentController::class,'getAllDocuments']);
Route::get('/document/search', [DocumentController::class, 'search']);
Route::get('/document/{user_id}',[DocumentController::class,'getDocumentByUserId']);
Route::get('/document-stats', [DocumentController::class,'getDocumentsStats']);


Route::get('/university',[UniversiteController::class,'getAllUniversities']);
Route::get('/university/count',[UniversiteController::class,'getUniversiteCount']);

Route::get('/ufr',[UfrController::class,'getAllUfrs']);
Route::get('/ufr/count',[UfrController::class,'getUfrCount']);
Route::get('/ufr/{university}',[UfrController::class,'getAllUfrsByUniversityId']);

Route::get('/departement',[DepartementController::class,'getAllDepartements']);
Route::get('/departement/count',[DepartementController::class,'getDepartementCount']);
Route::get('/departement/{ufr}',[DepartementController::class,'getAllDepartementsByIdUfr']);

Route::get('/formation',[LicenceController::class,'getAllLicences']);
Route::get('/formation/count',[LicenceController::class,'getLicenceCount']);
Route::get('/formation/{departement}',[LicenceController::class,'getAllLicencesByDepartementId']);


Route::get('telechargement/{filename}', function ($filename) {
    $filePath = storage_path('app/documents/' . $filename);
    
    if (file_exists($filePath)) {
        return response()->file($filePath);
    } else {
        return response()->json(['error' => 'File not found.'], 404);
    }
});

Route::get('images/{filename}', function ($filename) {
    $filePath = storage_path('app/images/' . $filename);
    
    if (file_exists($filePath)) {
        return response()->file($filePath);
    } else {
        return response()->json(['error' => 'File not found.'], 404);
    }
});
