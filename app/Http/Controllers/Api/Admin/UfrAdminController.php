<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ufr;
use App\Http\Requests\StoreUfrRequest;
use App\Http\Requests\UpdateUfrRequest;
use App\Http\Resources\Admin\UfrResource;

class UfrAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return UfrResource::collection(
            Ufr::with('universite')->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUfrRequest $request)
    {
        //
        $data = $request->validated();
        $ufr = Ufr::create($data);

        return response(new UfrResource($ufr),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ufr $ufr)
    {
        //
        return new UfrResource($ufr);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUfrRequest $request, $id)
    {
        //
        $data = $request->validated();
        $ufr = Ufr::find($id);
        $ufr->update($data);

        return new UfrResource($ufr);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ufr $ufr)
    {
        //
        $ufr->delete();

        return response('',204);
    }
}
