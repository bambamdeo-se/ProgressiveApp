using Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Services
{
    public interface IVinService 
    {
   Task<IEnumerable<VinDecode>> DecodeVINExtended();
        Task<IEnumerable<VinBatch>> DecodeVINBatchValue();
    }
}
