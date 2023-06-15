<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'taille',
        'licence_id',
        'niveau',
        'module',
        'annee',
        'user_id',
        'nature',
        'imageUrl',
        'path',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function licence(){
        return $this->belongsTo(Licence::class);
    }
}
