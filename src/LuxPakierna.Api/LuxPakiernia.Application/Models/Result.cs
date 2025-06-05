namespace LuxPakiernia.Application.Models;
public class Result<T>
{
    public bool Succeeded { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; } = new List<string>();

    public static Result<T> Success(T data)
    {
        return new Result<T> { Succeeded = true, Data = data };
    }

    public static Result<T> Failure(List<string> errors)
    {
        return new Result<T> { Succeeded = false, Errors = errors };
    }
}
