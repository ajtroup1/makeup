using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using makeup;
using makeup.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        // GET: api/<Car>
        [HttpGet]
        public List<Car> Get()
        {
            List<Car> cars = new List<Car>();
            ConnectionString connection = new ConnectionString();
            string cs = connection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT id, make, model, mileage, dateEntered, held, deleted FROM car";
            using var cmd = new MySqlCommand(stm, con);
            using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Car myCar = new Car
                        {
                            id = reader.GetInt32("id"),
                            make = reader.GetString("make"),
                            model = reader.GetString("model"),
                            mileage = reader.GetDouble("mileage"),
                            dateEntered = reader.GetString("dateEntered"),
                            held = reader.GetBoolean("held"),
                            deleted = reader.GetBoolean("deleted")
                        };
                        cars.Add(myCar);
                    }
                }

            return cars;
        }

        // GET api/<Car>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Car>
        [HttpPost]
        public void Post([FromBody] CarRequest myCar)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "INSERT INTO car (make, model, mileage, dateEntered) VALUES (@make, @model, @mileage, @dateEntered)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@make", myCar.make);
            cmd.Parameters.AddWithValue("@model", myCar.model);
            cmd.Parameters.AddWithValue("@mileage", myCar.mileage);
            cmd.Parameters.AddWithValue("@dateEntered", myCar.dateEntered);
            cmd.ExecuteNonQuery();
        }

        // PUT api/<Car>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Car car)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "UPDATE car SET make = @make, model = @model, mileage = @mileage, dateEntered = @dateEntered, held = @held, deleted = @deleted WHERE id = @id";

            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@make", car.make);
            cmd.Parameters.AddWithValue("@model", car.model);
            cmd.Parameters.AddWithValue("@mileage", car.mileage);
            cmd.Parameters.AddWithValue("@dateEntered", car.dateEntered);
            cmd.Parameters.AddWithValue("@held", car.held);
            cmd.Parameters.AddWithValue("@deleted", car.deleted);
            cmd.Parameters.AddWithValue("@id", car.id);

            cmd.ExecuteNonQuery();
        }

        // DELETE api/<Car>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
