<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ufr;
use Illuminate\Http\Request;

class UfrController extends Controller
{
    //
    public function getAllUfrs(){
        return Ufr::all();
    }

    public function getAllUfrsByUniversityId($universityId)
    {
        $ufrs = Ufr::where('universite_id', $universityId)->get();
        return $ufrs;
    }
    public function getUfrCount(){
        return Ufr::query()->count();
    }
    
}
