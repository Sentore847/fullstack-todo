using System.Text.Json.Serialization;

public class Todo
{
    public const int MAX_TITLE_LENGTH = 250;

    [JsonConstructor]
    public Todo(Guid id, string title, bool isCompleted)
    {
        Id = id;
        Title = title;
        IsCompleted = isCompleted;
    }

    public Guid Id { get; }
    public string Title { get; } = string.Empty;
    public bool IsCompleted { get; }

    public static (Todo Todo, string Error) Create(Guid id, string title, bool isCompleted)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(title) || title.Length > MAX_TITLE_LENGTH)
        {
            error = "Title can not be empty or longer then 250 symbols";
        }

        var todo = new Todo(id, title, isCompleted);

        return (todo, error);
    }
}
