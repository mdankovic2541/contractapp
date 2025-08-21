<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;


// Koristi punu klasu za CORS
Route::middleware([\Illuminate\Http\Middleware\HandleCors::class])->group(function () {
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('contracts', ContractController::class);
});