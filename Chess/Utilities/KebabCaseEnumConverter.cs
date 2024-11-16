namespace Chess.Utilities;

using System.Text.Json;
using System.Text.Json.Serialization;

public class KebabCaseEnumConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (value == null)
        {
            throw new JsonException("Cannot convert null value to enum.");
        }

        // Convert kebab-case back to PascalCase
        var pascalCaseValue = string.Join("", value.Split('-')
            .Select(word => char.ToUpperInvariant(word[0]) + word.Substring(1)));

        if (Enum.TryParse(pascalCaseValue, true, out T result))
        {
            return result;
        }

        throw new JsonException($"Unable to convert \"{value}\" to enum {typeof(T)}");
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        // Convert PascalCase to kebab-case
        var kebabCaseValue = string.Concat(value.ToString()
            .Select((c, i) => char.IsUpper(c) && i > 0 ? "-" + char.ToLowerInvariant(c) : char.ToLowerInvariant(c).ToString()));

        writer.WriteStringValue(kebabCaseValue);
    }
}
