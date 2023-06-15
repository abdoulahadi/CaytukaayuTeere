<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    //

    public function getAllDepartements(){
        return Departement::all();
    }

    public function getAllDepartementsByIdUfr($idUfr){
        return Departement::where('ufr_id',$idUfr)->get();
    }

    public function getDepartementCount(){
        return Departement::query()->count();
    }
}
