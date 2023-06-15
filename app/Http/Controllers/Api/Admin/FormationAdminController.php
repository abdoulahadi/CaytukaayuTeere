<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Licence;
use App\Http\Requests\StoreLicenceRequest;
use App\Http\Requests\UpdateLicenceRequest;
use App\Http\Resources\Admin\FormationResource;

class FormationAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return FormationResource::collection(
            Licence::with('departement')->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLicenceRequest $request)
    {
        //
        $data = $request->validated();
        $formation = Licence::create($data);

        return response(new FormationResource($formation),201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $licence = Licence::with('departement')->find($id);
        return new FormationResource($licence);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLicenceRequest $request, $id)
    {
        //
        $data = $request->validated();
        $licence = Licence::with('departement')->find($id);
        $licence->update($data);

        return new FormationResource($licence);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Licence $licence)
    {
        $licence->delete();

        return response('',204);
    }
}
