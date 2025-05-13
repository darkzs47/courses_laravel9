<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check() && auth()->user()->role === "admin";
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10', 'max:255'],
            'language_id' => ['required', 'exists:languages,id'],
            'capacity' => ['required', 'integer', 'min:1', 'max:50'],
            'start_datetime' => ['required', 'date', 'after:now'],
            'image' => ['required', 'file', 'mimes:jpg,jpeg', 'max:2048'],
        ];
    }

    public function messages(){
        return [
            'name.required' => 'Название курса обязательно для заполнения',
            'name.max' => 'Название курса не должно превышать 255 символов.',

            'description.required' => 'Описание курса обязательно для заполнения',
            'description.min' => 'Описание должно содержать минимум 10 символов',
            'description.max' => 'Описание должно содержать максимум 255 символов',

            'language_id.required' => 'Выберите язык',
            'language_id.exists' => 'Курсов с таким языком не существует',

            'capacity.required' => 'Укажите максимальное количество участников',
            'capacity.integer' => 'Количество участников должно быть целым числом',
            'capacity.min' => 'Минимум 1 участник',
            'capacity.max' => 'Максимум 50 участников',

            'start_datetime.required' => 'Укажите дату начала курса',
            'start_datetime.date' => 'Укажите корректную дату',
            'start_datetime.after' => 'Дата начала должна быть позже текущего времени',

            'image.required' => 'Загрузите изображение курса',
            'image.max' => 'Размер изображения не должен превышать 2MB.',
        ];
    }
}
