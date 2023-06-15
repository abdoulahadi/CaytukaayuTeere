<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Licence;
use Illuminate\Http\Request;

class LicenceController extends Controller
{
    //

    public function getAllLicences(){
        return Licence::all();
    }

    public function getAllLicencesByDepartementId($id_departement){
        return Licence::where('departement_id',$id_departement)->get();
    }
    public function getLicenceCount(){
        return Licence::query()->count();
    }
}
