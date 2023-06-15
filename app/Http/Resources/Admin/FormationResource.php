<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'sigle'=>$this->sigle,
            'nom'=>$this->nom,
            'departement_id'=>$this->departement_id,
            'departement_sigle'=>$this->departement->sigle,
        ];
    }
}
