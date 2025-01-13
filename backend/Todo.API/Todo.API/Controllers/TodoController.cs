using Microsoft.AspNetCore.Mvc;

namespace Todo.API.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TodoController : ControllerBase
    {
        private static List<Todo> _todoItems = new List<Todo>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_todoItems);
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] Todo newItem)
        {
            if (newItem == null || string.IsNullOrWhiteSpace(newItem.Title))
            {
                return BadRequest("Invalid todo item.");
            }

            var (todo, error) = Todo.Create(Guid.NewGuid(), newItem.Title, newItem.IsCompleted);
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(error);
            }

            _todoItems.Add(todo);
            return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteItem(Guid id)
        {
            var item = _todoItems.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound($"Todo item with ID {id} not found.");
            }

            _todoItems.Remove(item);
            return NoContent();
        }

        [HttpPatch("{id:guid}")]
        public IActionResult UpdateItem(Guid id, [FromBody] Todo updateModel)
        {
            var item = _todoItems.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound($"Todo item with ID {id} not found.");
            }

            if (updateModel.IsCompleted != null)
            {
                item.IsCompleted = updateModel.IsCompleted;
            }

            return Ok(item);
        }
    }
}