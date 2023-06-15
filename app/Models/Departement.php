<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
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
        'ufr_id',
        'description',
        'image',
    ];

    public function ufr(){
        return $this->belongsTo(Ufr::class);
    }

    public function licences(){
        return $this->hasMany(Licence::class);
    }
}
