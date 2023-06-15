<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ufr extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable =[
        'id',
        'sigle',
        'nom',
        'universite_id',
        'description',
        'image',
    ];

    public function universite(){
        return $this->belongsTo(Universite::class);
    }

    public function departements(){
        return $this->hasMany(Departement::class);
    }
}