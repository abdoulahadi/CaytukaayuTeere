<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Departement;
use App\Http\Requests\StoreDepartementRequest;
use App\Http\Requests\UpdateDepartementRequest;
use App\Http\Resources\Admin\DepartementResource;

class DepartementAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return DepartementResource::collection(
            Departement::with('ufr')->orderBy('id','desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartementRequest $request)
    {
        //
        $data = $request->validated();
        $departement = Departement::create($data);

        return response(new DepartementResource($departement),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Departement $departement)
    {
        return new DepartementResource($departement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartementRequest $request, Departement $departement)
    {
        //
        $data = $request->validated();
        $departement->update($data);

        return new DepartementResource($departement);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departement $departement)
    {
        //
        $departement->delete();

        return response('',204);
    }
}
