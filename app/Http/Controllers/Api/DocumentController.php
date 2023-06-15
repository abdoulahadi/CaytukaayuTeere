<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddDocumentRequest;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    //

    

    public function addDocument(AddDocumentRequest $addDocumentRequest)
    {   
        
        $data = $addDocumentRequest->validated();
    
        // Récupérer le fichier téléchargé
        $document = $addDocumentRequest->file('document');
    
        // Générer un nom de fichier unique
        $originalName = $document->getClientOriginalName();
        $fileName = pathinfo($originalName, PATHINFO_FILENAME);
        $extension = $document->getClientOriginalExtension();
        $uniqueFileName = $fileName . '_' . time() . '.' . $extension;
    
        // Déterminer le dossier de stockage
        $folder = 'documents';
    
        // Déplacer le fichier vers le dossier spécifié
        $path = $document->storeAs($folder, $uniqueFileName);
        
        $imageUrl =  ($extension ==='xlsx' || $extension ==='xls') ? 'excel.png' : $extension.'.png';
        // Créer une nouvelle entrée dans la base de données
        Document::create([
            'nom' => $originalName,
            'taille' => $document->getSize(),
            'licence_id' => $data['formation'],
            'niveau' => $data['niveau'],
            'module' => $data['module'],
            'annee' => $data['annee'],
            'user_id' => $data['user_id'],
            'nature' => $data['nature'],
            'imageUrl' => $imageUrl,
            'path' => $uniqueFileName,
        ]);
    
        return response([
            'message' => 'Le document a bien été enregistré'
        ]);
    }
    

    public function getAllDocuments(){
        return Document::with(['user','licence'])->orderBy('id','desc')->paginate(10);
    }

    public function getDocumentByUserId($id_user){
        return Document::where('user_id',$id_user)->with(['user','licence'])->get();
    }

    public function getDocumentsStats(Request $request)
    {
        $documentsStats = Document::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->get();

        return response()->json($documentsStats);
    }

    public function search(Request $request)
{
    $query = Document::query()->with('user', 'licence.departement.ufr.universite');

    if ($request->has('nom_document')) {
        $query->where('nom', 'LIKE', '%' . $request->input('nom_document') . '%');
    }

    if ($request->has('nom_licence')) {
        $query->whereHas('licence', function ($query) use ($request) {
            $query->where('sigle', $request->input('nom_licence'));
        });
    }

    if ($request->has('nom_departement')) {
        $query->whereHas('licence.departement', function ($query) use ($request) {
            $query->where('sigle', $request->input('nom_departement'));
        });
    }

    if ($request->has('nom_ufr')) {
        $query->whereHas('licence.departement.ufr', function ($query) use ($request) {
            $query->where('sigle', $request->input('nom_ufr'));
        });
    }

    if ($request->has('nom_universite')) {
        $query->whereHas('licence.departement.ufr.universite', function ($query) use ($request) {
            $query->where('sigle', $request->input('nom_universite'));
        });
    }

    // Si aucun critère de recherche n'est spécifié, retourne tous les documents avec les relations "user" et "licence" paginées
    if (!$request->hasAny(['nom_document', 'nom_licence', 'nom_departement', 'nom_ufr', 'nom_universite'])) {
        return Document::with(['user', 'licence'])->orderBy('id', 'desc')->paginate(10);
    }

    // Ordonner par ID en ordre décroissant et appliquer la pagination
    $results = $query->orderBy('id', 'desc')->paginate(10);

    return response()->json($results);
}

}
