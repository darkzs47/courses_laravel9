<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function ShowFormAddCourse(){
        return Inertia::render('NewCourseForm');
    }
}
