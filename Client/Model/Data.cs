using Blazor.IndexedDB.WebAssembly;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{

    public class ContextDb : IndexedDb
    {
        public ContextDb(IJSRuntime jSRuntime, string name, int version) : base(jSRuntime, name, version) { }
        public IndexedSet<Student> Student { get; set; }
    }
    public class Student
    {
        [System.ComponentModel.DataAnnotations.Key]
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
