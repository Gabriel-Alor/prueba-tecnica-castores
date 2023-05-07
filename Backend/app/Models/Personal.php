<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    use HasFactory;

    protected $table = 'personal';
    protected $primaryKey = 'idpersonal';
    public $timestamps = false;

    protected $fillable = [
        'apepaterno',
        'apematerno',
        'nombre',
        'direccion',
        'fechadeingreso'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'idpersonal', 'idpersonal');
    }
}
