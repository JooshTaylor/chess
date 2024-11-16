namespace Chess.Utilities;

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class KebabCaseEnumConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert)
    {
        // Check if the type is an enum
        return typeToConvert.IsEnum;
    }

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
    {
        // Create a KebabCaseEnumConverter for the specific enum type
        var converterType = typeof(KebabCaseEnumConverter<>).MakeGenericType(typeToConvert);
        return (JsonConverter)Activator.CreateInstance(converterType);
    }
}
