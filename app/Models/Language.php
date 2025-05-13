<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\Registration;
use App\Models\User;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
