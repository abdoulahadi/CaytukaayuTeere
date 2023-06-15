<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Universite;
use App\Http\Requests\StoreUniversiteRequest;
use App\Http\Requests\UpdateUniversiteRequest;
use App\Http\Resources\Admin\UniversityResource;

class UniversityAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return UniversityResource::collection(
            Universite::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUniversiteRequest $request)
    {
        //
        $data = $request->validated();

        $university = Universite::create($data);

        return response(new UniversityResource($university),201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Utilisez l'ID pour récupérer la ressource correspondante à partir de votre source de données
    $resource = Universite::find($id);

    // Vérifiez si la ressource existe
    if ($resource) {
        // Retournez la ressource en tant que réponse JSON
        return new UniversityResource($resource);
    } else {
        // Retournez une réponse d'erreur appropriée si la ressource n'est pas trouvée
        return response()->json(['message' => 'Resource not found'], 404);
    }
        // return new UniversityResource($universite);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUniversiteRequest $request, $id)
    {
        //Universite $universite
        // Utilisez l'ID pour récupérer la ressource correspondante à partir de votre source de données
    $universite = Universite::find($id);
        $data = $request->validated();
        $universite->update($data);

        return new UniversityResource($universite);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Utilisez l'ID pour récupérer la ressource correspondante à partir de votre source de données
        $universite = Universite::find($id);
        $universite->delete();
        return response('',204);
    }
}
