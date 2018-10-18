using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public interface IDatingRepository<T> where T: class
    {
        void Add(T entity);
        void Delete(T entity);

        Task<bool> SaveAll();

        Task<IEnumerable<T>> GetItems();

        Task<T> GetItem(int id);
    }
}