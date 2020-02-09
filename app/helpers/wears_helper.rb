module WearsHelper

  def to_hex(n)
    num_hex = n.to_s 16
    num_hex = num_hex.insert(0, "0") if num_hex.length == 1
    return num_hex
  end

  def rgb_to_hex(r, g, b)
    r_hex = to_hex r
    g_hex = to_hex g
    b_hex = to_hex b
    "\##{r_hex}#{g_hex}#{b_hex}"
  end
end
