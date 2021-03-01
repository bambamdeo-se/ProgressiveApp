using Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Components;
using System.Net;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace Client.Services
{
    public class VinService:IVinService
    {
        private readonly HttpClient _httpClient;

        string VIN = "5UXWX7C5*BA";
        public VinService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }
        public async Task <IEnumerable<VinDecode>>DecodeVINExtended()
        {

            List<VinDecode> VINList = new List<VinDecode>();
            string url = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/5UXWX7C5*BA?format=json&modelyear=2011";
            _httpClient.BaseAddress = new Uri(url);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var result = await _httpClient.GetStringAsync(url);
            dynamic jsonObj = JsonConvert.DeserializeObject(result); //Json.Decode(result);
            VinDecode decode = null;
            foreach (var node in jsonObj.Results)
            {
                decode = new VinDecode();
                if (node.Variable == "Manufacturer Name") { decode.Manufacturer = node.Value; };
                if (node.Variable == "Make") { decode.Make = node.Value; };
                if (node.Variable == "Model") { decode.Model = node.Value; };
                if (node.Variable == "MakeId") { decode.MakeId = node.Value; };
                if(node.Variable== "Trim") { decode.Trim = node.Value; };
                if (node.Variable == "Manufacturer Name") { decode.Manufacturer = node.Value; };
                if (node.Variable == "VIN") { decode.VIN = node.Value; };
                if (node.Variable == "ManufacturerId") { decode.ManufacturerId = node.Value; };
                if (node.Variable == "Fuel Type - Primary") { decode.FuelType = node.Value; };
                VINList.Add(decode);
            }

            Console.WriteLine("Result from api"+ result);
            Console.WriteLine("List"+ JsonConvert.SerializeObject(VINList));
            
            return VINList;
        }
        
        public async Task<IEnumerable<VinBatch>> DecodeVINBatchValue()
        {
            HttpClient _httpClient = new HttpClient();

            List<VinBatch> VINBatch = new List<VinBatch>();
            string text = "3GNDA13D76S000000;5XYKT3A12CG000000;";
            string url = @"https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/";
            var nameValues = new Dictionary<string, string>();
            nameValues.Add("data", text);
            nameValues.Add("format", "json");

            _httpClient.BaseAddress = new Uri(url);

            // using FormUrlEncodedContent
            var name = new FormUrlEncodedContent(nameValues);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            System.Threading.CancellationToken token = new System.Threading.CancellationToken();
            
            var tmp =await _httpClient.PostAsync(_httpClient.BaseAddress, name, token);
            var result = await tmp.Content.ReadAsStringAsync();
            dynamic jsonObj = JsonConvert.DeserializeObject(result);
            Console.WriteLine("Result from api" + result);
            VinBatch batches = null;
            foreach (var node in jsonObj.Results)
            {
                batches = new VinBatch();
                {
                    batches.AirBagLocFront = node.AirBagLocFront;
                    batches.AirBagLocSide = node.AirBagLocSide;
                    batches.BodyClass = node.BodyClass;
                    batches.FuelTypePrimary = node.FuelTypePrimary;
                    batches.PlantCity = node.PlantCity;
                    batches.PlantCountry = node.PlantCountry;
                    batches.Doors = node.Doors;
                    batches.EngineCylinders = node.EngineCylinders;
                    batches.EngineHP = node.EngineHP;
                    batches.ErrorCode = node.ErrorCode;
                    batches.ErrorText = node.ErrorText;
                }
                VINBatch.Add(batches);
            }
           
            return VINBatch;
            
        }




    }

}
