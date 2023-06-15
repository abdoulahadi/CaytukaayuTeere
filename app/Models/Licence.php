<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Licence extends Model
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
        'departement_id',
        'description',
        'image',
    ];

    public function departement(){
        return $this->belongsTo(Departement::class);
    }

    public function users(){
        return $this->hasMany(User::class);
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }
}
