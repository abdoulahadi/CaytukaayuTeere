<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartementResource extends JsonResource
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
            'ufr_id'=>$this->ufr_id,
            'ufr_sigle'=>$this->ufr->sigle,
        ];
    }
}
