using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Services
{
    public class ActionOutputBase
    {
        public ActionStatus Status { get; set; }
        public string Message { get; set; }
        public long ErrorId { get; set; }
    }
    public class ActionOutput<T> : ActionOutputBase
    {
        public T data { get; set; }
        public List<T> Results { get; set; }
        public IEnumerable<dynamic> DynamicList { get; set; }
        public object OutputData { get; set; }
        public long ErrorId { get; set; }
    }
    public enum ActionStatus
    {
        Successfull = 200,
        BadRequest = 400,
        ServerError = 500,
        Unauthorized = 401
    }
}
