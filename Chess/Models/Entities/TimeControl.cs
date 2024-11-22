using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Chess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Chess.Models.Entities;

[PrimaryKey("Time", "Increment")]
public class TimeControl
{
    public TimeControlType Type { get; set; }
    public ulong Time { get; set; }
    public ulong Increment { get; set; }
}