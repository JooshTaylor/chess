using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Chess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Chess.Models.Entities;

[PrimaryKey("Time", "Increment")]
public class TimeControl
{
    public TimeControlType Type { get; init; }
    public ulong Time { get; init; }
    public ulong Increment { get; init; }
}