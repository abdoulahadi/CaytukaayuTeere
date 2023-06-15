<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Universite;
use Illuminate\Http\Request;

class UniversiteController extends Controller
{
    //

    public function getAllUniversities(){
        return Universite::all();
    }
    public function getUniversiteCount(){
        return Universite::query()->count();
    }
}
