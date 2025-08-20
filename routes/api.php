<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;


Route::apiResource('clients', ClientController::class);
Route::apiResource('contracts', ContractController::class);
