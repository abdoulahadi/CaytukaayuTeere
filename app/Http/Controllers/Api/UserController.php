<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($request->method() === 'PUT') {
            // Traitement spécifique pour la méthode PUT
              // Validez les données du formulaire
    $validator = Validator::make($request->all(), [
        'image' => 'nullable|image',
        'username' => 'required|string|max:255|unique:users,username,'.$id,
        'firstname' => 'nullable|string|max:255',
        'lastname' => 'nullable|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,'.$id,
        'niveau' => 'nullable|string|max:255',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 422);
    }

    // Si une nouvelle image est fournie, mettez à jour l'image
    if ($request->hasFile('image')) {
        // Récupérez le fichier image
        $imageFile = $request->file('image');
        // Générez un nom de fichier unique pour l'image
        $imageName = uniqid() . '.' . $imageFile->getClientOriginalExtension();
        // Stockez la nouvelle image dans le dossier app/images
        $imagePath = $imageFile->storeAs('images', $imageName);

        // Supprimez l'ancienne image s'il en existe une
        if ($user->image && $user->image!=='images/profile.png') {
            Storage::delete($user->image);
        }

        // Mettez à jour le champ 'image' avec le nouveau chemin
        $user->image = $imagePath;
    }

    // Mettez à jour les autres champs de l'utilisateur
    $user->username = $request->input('username');
    $user->firstname = $request->input('firstname');
    $user->lastname = $request->input('lastname');
    $user->email = $request->input('email');
    $user->niveau = $request->input('niveau');

    // Enregistrez les modifications dans la base de données
    $user->save();
        } elseif ($request->method() === 'POST') {
            // Traitement pour la méthode POST
        }
        return $user;
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
