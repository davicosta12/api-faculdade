using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.OpenApi.Models;
using my_api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<DbContext>();

builder.Services.AddCors();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend Token Teste", Version = "v1" });

    c.TagActionsBy(api =>
      {
          if (api.GroupName != null)
          {
              return new[] { api.GroupName };
          }

          var controllerActionDescriptor = api.ActionDescriptor as ControllerActionDescriptor;
          if (controllerActionDescriptor != null)
          {
              return new[] { controllerActionDescriptor.ControllerName };
          }

          throw new InvalidOperationException("Unable to determine tag for endpoint.");
      });

    c.DocInclusionPredicate((name, api) => true);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
);

app.UseAuthorization();

app.MapControllers();

app.Run();
