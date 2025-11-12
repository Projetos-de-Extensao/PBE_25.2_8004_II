import React, { useState, useEffect } from "react";
import {
  Container, Box, TextField, Button, Typography, Paper,
  RadioGroup, FormControlLabel, Radio, Stack
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("aluno"); // padrão
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Pré-seleciona papel vindo da Home (?as=aluno|professor)
  useEffect(() => {
    const as = params.get("as");
    if (as === "aluno" || as === "professor") setRole(as);
  }, [params]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      // redireciona pelo papel escolhido
      navigate(role === "aluno" ? "/dashboard/aluno" : "/dashboard/professor", { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          p: 4, mt: 10, display: "flex", flexDirection: "column",
          alignItems: "center", borderRadius: 3,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Conectar-se
        </Typography>

        <Stack sx={{ width: "100%", mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">Entrar como</Typography>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
          >
            <FormControlLabel value="aluno" control={<Radio />} label="Aluno" />
            <FormControlLabel value="professor" control={<Radio />} label="Professor" />
          </RadioGroup>
        </Stack>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal" required fullWidth id="username" label="Usuário"
            autoComplete="username" autoFocus value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth id="password" name="password"
            label="Senha" type="password" autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}