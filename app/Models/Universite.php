<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Universite extends Model
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
        'description',
        'image',
    ];

    public function ufrs(){
        return $this->hasMany(Ufr::class);
    }
}
