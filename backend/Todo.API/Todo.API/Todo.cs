namespace Todo
{
    public class Todo
    {
        public const int MAX_TITLE_LENGTH = 250;

        public Todo() { }

        private Todo(Guid id, string title, bool? isCompleted)
        {
            Id = id;
            Title = title;
            IsCompleted = isCompleted ?? false;
        }

        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool? IsCompleted { get; set; }

        public static (Todo Todo, string Error) Create(Guid id, string title, bool? isCompleted)
        {
            var error = string.Empty;

            if (string.IsNullOrEmpty(title) || title.Length > MAX_TITLE_LENGTH)
            {
                error = "Title can not be empty or longer than 250 symbols";
            }

            var todo = new Todo(id, title, isCompleted);

            return (todo, error);
        }
    }
}
