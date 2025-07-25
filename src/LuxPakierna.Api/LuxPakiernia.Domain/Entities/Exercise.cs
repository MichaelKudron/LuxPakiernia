﻿namespace LuxPakiernia.Domain.Entities;
public class Exercise
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string MuscleGroup { get; set; }
    public Guid UserId { get; set; }

    public ICollection<ExerciseInPlan> ExercisesInPlans { get; set; }
}